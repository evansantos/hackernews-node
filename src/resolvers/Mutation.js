const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function post(_, args, context) {
  const { url, description } = args;
  const userId = getUserId(context);

  return context.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: userId } }
  });
}

async function signup(_, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

async function login(_, args, context) {
  const user = await context.prisma.user({ email: args.email });
  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid || !user) {
    throw new Error("Your email and/or password are wrong");
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

async function vote(_, args, context) {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId }
  });

  if (linkExists) {
    throw new Error(`Already Voted for link ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}

module.exports = {
  post,
  signup,
  login,
  vote
};
