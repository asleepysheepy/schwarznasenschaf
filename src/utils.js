exports.deleteMessages = (channel, deleteAmount) => {
  if (deleteAmount < 1 || deleteAmount >= 100) {
    channel.send(`Please specific a valid amount of messages to delete [1-100)`).then((mess) => {
      setTimeout(() => {
        mess.delete();
      }, 5000);
    });
    return;
  }

  channel.bulkDelete(deleteAmount + 1, true).then((messages) => {
    channel.send(`${messages.size - 1} messages deleted.`).then((mess) => {
      setTimeout(() => {
        mess.delete();
      }, 5000);
    });
  });
}