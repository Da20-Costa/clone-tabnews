import bcryptjs from "bcryptjs";
import crypto from "crypto";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperedPassword = getPepperedPassword(password);
  return await bcryptjs.hash(pepperedPassword, rounds);
}

function getNumberOfRounds() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return 1;
  }
  return 14;
}

function getPepperedPassword(password) {
  const pepper = process.env.PEPPER || "";
  if (!pepper) return password;

  const pepperedPassword = crypto
    .createHmac("sha256", pepper)
    .update(password)
    .digest("base64");
  return pepperedPassword;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(
    getPepperedPassword(providedPassword),
    storedPassword,
  );
}

const password = {
  hash,
  compare,
};

export default password;
