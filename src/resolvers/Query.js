const feed = async (_, args, context) => {
  const where = args.filter
    ? {
        OR: [
          {
            description_contains: args.filter
          },
          {
            url_contains: args.filter
          }
        ]
      }
    : {};
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  const count = await context.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count();

  return {
    links,
    count
  };
};
const info = () => "This is the API of Hackernews Clone";

module.exports = {
  feed,
  info
};
