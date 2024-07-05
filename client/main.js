console.log(`Greetings from ${module.id}!`);
Session.setDefault('refreshId', Random.id());
Posts = new Mongo.Collection('posts');

Tracker.autorun(() => {
  const refreshId = Session.get('refreshId');
  console.log('refreshId is', refreshId);

  Meteor.subscribe('posts', Session.get('refreshId'), () => {
    console.log('Subscription ready');
  
    const postEl = document.createElement('div');
    postEl.innerHTML = `Refresh ${refreshId} Posts(${Posts.find().count()})<br>`;
    document.body.appendChild(postEl);
  });
});


Tracker.autorun(() => {
  console.log('Posts.find invalidating');

  const postEl = document.createElement('div');
  postEl.innerHTML = `Posts: ${Posts.find().map(p => p._id).join()}`;
  document.body.appendChild(postEl);
});
