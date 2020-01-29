function postedBy(parent, __, context) {
  return context.prisma.link({ id: parent.id }).postedBy();
}

function votes(parent, __, context) {
  return context.prisma.link({ id: parent.id }).votes();
}

module.exports = {
  postedBy,
  votes
};
