import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { mongo } from "mongoose";
//nivel de seguridad, hashea en base a ese nivel, compara hasheos

/**
 * @createHash
 * recibe una contraseña cruda (sin proteccion) y devuelve una contraseña hasheada
 */

function createHash(password){
    const salt = genSaltSync(10); // creamos el nivel de seguridad
    const hashPassword = hashSync(password, salt); // guardamos la contraseña la contraseña hasheada 
    return hashPassword; // la retornamos
}

/**
 * @verifyHash
 * recibe contraseña cruda (la del formulario) y la contraseña de la base de datos las va a comprarar y devuelve el booleano correspondiente
 */
function verifyHash(password, mongoPassword){
    console.log({password, mongoPassword}); 
    const verify = compareSync(password, mongoPassword)
    return verify
}

export {createHash, verifyHash}
