export const getTimeAgo = (timestamp: number) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const differenceInSeconds = (now.getTime() - postDate.getTime()) / 1000;
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);

  return `${differenceInMinutes} минут назад`;
};
