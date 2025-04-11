import passport from "passport";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/users.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken, verifyToken } from "../helpers/token.helper.js";
const {
  JWT_KEY,
  GOOGLE_ID: clientID,
  GOOGLE_SECRET: clientSecret,
} = process.env;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use(
  "register",
  new LocalStrategy(
    // objeto de configuracion de la estrategia
    { passReqToCallback: true, usernameField: "email" },
    // callback de la estrategia (logica de la autenticacion/autorizacion)
    async (req, email, password, done) => {
      try {
        // aqui va la logica del register
        const data = req.body;
        const user = await usersManager.readBy({ email });
        if (user) {
          return done(null, null, { message: "invalid credentials", status: 401 });
        }
        data.password = createHash(data.password);
        const response = await usersManager.create(data);
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy( // objeto de configuracion de la estrategia
    { passReqToCallback: true, usernameField: "email" },
    // callback de configuracion de la estrategia (logica de la autenticacion/autorizacion)
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "not user found",
            status: 401,
          });
        }
        if (!verifyHash(password, user.password)) {
          return done(null, null, {
            message: "invalid credentials",
            status: 401,
          });
        }
        // crear el token y agregarlo al objeto de requerimientos
        let data = {
          user_id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = createToken(data);
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // si un usuario se registra desde formulario, el campo es email es del formulario
        // en cambio si se registra desde google/tercero, el campo email es el id provisto
        const email = profile.id;
        let user = await usersManager.readBy({ email });
        if (!user) {
          user = {
            name: profile.name.givenName,
            avatar: profile.picture,
            email: profile.id,
            password: createHash(profile.id),
          };
          user = await usersManager.create(user);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// middleware para verificar el usuario de parte de nuestra app
passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([req=>req?.cookies?.token]),
      secretOrKey: JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          const error = new Error("bad auth");
          error.status = 401;
          throw error;
        }
        // done agrega al obj de req el objeto user
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done(null, null, {
            message: "bad auth",
            status: 401,
          });
        }
        if (user.role !== "ADMIN") {
          return done(null, null, {
            message: "forbidden",
            status: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
