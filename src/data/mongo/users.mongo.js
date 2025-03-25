import Manager from "./manager/manager.mongo.js"
import User from "./models/users.model.js"

const usersManager = new Manager(User)
export default usersManager