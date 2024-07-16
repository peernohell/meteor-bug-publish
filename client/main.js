console.log(`Greetings from ${module.id}!`);
Session.setDefault('refreshId', 1);
Posts = new Mongo.Collection('posts');

Tracker.autorun(() => {
  const refreshId = Session.get('refreshId');
  console.log('autorun refreshId', refreshId);

  Meteor.subscribe('posts', Session.get('refreshId'), () => {
    console.log('Subscription ready');
  
    const postEl = document.createElement('div');
    postEl.innerHTML = `Count ${refreshId} Posts(${Posts.find().count()})<br>`;
    document.body.appendChild(postEl);
  });
});


Tracker.autorun(() => {
  console.log('autorun called');

  const postEl = document.createElement('div');
  postEl.innerHTML = `Posts: ${Posts.find().map(p => p._id).join()}`;
  document.body.appendChild(postEl);
});


Posts.find().observeChanges({
  added(id, fields) { 
    const postEl = document.createElement('div');
    postEl.innerHTML = `observeChanges: Added ${id}`;
    document.body.appendChild(postEl);
 },
  removed(id) { 
      const postEl = document.createElement('div');
      postEl.innerHTML = `observeChanges: Removed ${id}`;
      document.body.appendChild(postEl);
   },
});