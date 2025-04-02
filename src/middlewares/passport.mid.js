import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import usersManager from "../data/mongo/users.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken, verifyToken } from "../helpers/token.helper.js";

const clientID = process.env.GOOGLE_ID 
const clientSecret = process.env.GOOGLE_SECRET ;
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
          const error = new Error("invalid credencials");
          error.status = 401;
          throw error;
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
    // callback de la estrategia (logica de la autenticacion/autorizacion)
    async (req, email, password, done) => {
      try {
        const response = await usersManager.readBy({ email });
        if (!response) {
          const error = new Error("not user found");
          error.status = 404;
          throw error;
        }
        if (!verifyHash(password, response.password)) {
          const error = new Error("invalids credentials");
          error.status = 401;
          throw error;
        }
        // crear el token y agregarlo al objeto de requerimientos
        const data = {
          user_id:response._id,
          email: response.email,
          role: response.role
        } 
        const token = createToken(data)
        req.token = token
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
    "google", 
    new GoogleStrategy(
        {clientID, clientSecret, callbackURL},
        async (accessToken, refreshToken, profile, done)=>{
            try {
                // si un usuario se registra desde formulario, el campo es email es del formulario
                // en cambio si se registra desde google/tercero, el campo email es el id provisto
                const email = profile.id 
                let user = await usersManager.readBy({email})
                if(!user){
                    user = {
                        name: profile.name.givenName,
                        avatar: profile.picture,
                        email: profile.id,
                        password: createHash(profile.id)
                    }
                    user = await usersManager.create(user)
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
);

export default passport;
