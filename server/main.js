import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";
globalThis.Posts = new Mongo.Collection('posts');

Meteor.startup(() => {
  // Code to run on server startup.
  console.log(`Greetings from ${module.id}!`);
});


Meteor.publish('posts', function(count) {
  console.log('Publishing posts with count', count);
  return Posts.find({}, { limit : count });
});

if (!await Posts.find().countAsync()) {
  for (let i = 0; i < 10; i++) {
    Posts.insertAsync({ _id: `pst_${i}`, title: `Post #${i}` });
  }
}
