function newLinkSubscribe(_, __, context) {
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

function newVoteSubscribe(_, __, context) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
};

module.exports = {
  newLink,
  newVote
};
