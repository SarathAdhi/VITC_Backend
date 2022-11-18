const prisma = require("../lib/prisma");

const validateToken = ({ headers }) => {
  const token = headers?.authorization;

  if (!token) return null;

  return prisma.faculty.findFirst({
    where: {
      uuid: token,
    },
  });
};

module.exports = { validateToken };
