function link(parent, __, context) {
  return context.prisma.vote({ id: parent.id }).link();
}

function user(parent, __, context) {
  return context.prisma.vote({ id: parent.id }).user();
}

module.exports = {
  link,
  user
};
