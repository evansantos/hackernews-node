function links(parent, __, context) {
  return context.prisma.user({ id: parent.id }).links();
}

module.exports = {
  links
};
