import { v4 as uuidv4 } from "uuid";
//import bcrypt from 'bcrypt';
import { StreamChat } from "stream-chat";

const api_key = "rryejj45awqa";
const api_secret = "da6ap7n7g3hxfrwc7c9653gzfj2xbnm3u2ncbneu28nn27dst2a3wcfbwd9q3gru";
const serverClient = StreamChat.getInstance(api_key, api_secret);

export const singup = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    //const hashedPassword = await bcrypt.hash(password, 11);
    const token = serverClient.createToken(userId);
res.json({ token, userId, firstName, lastName, username, password/*hashedPassword*/ });
    }
  catch (err) {
    res.json(err);
  }
};
  
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) {
      return res.json({ message: 'User not found' })
    }
    const token = serverClient.createToken(users[0].id);
    //const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
    if (/*passwordMatch*/password === users[0].password) {
      res.json({ token, userId: users[0].id, firstName: users[0].firstName, lastName: users[0].lastName, username, });
    }
    }
  catch (err) {
    res.json(err);
  }
};