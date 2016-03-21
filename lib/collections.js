Websites = new Mongo.Collection("websites");

if (Meteor.isServer) {
    Meteor.publish("websites", function () {
        return Websites.find();
    });
    Meteor.publish("users", function () {
        return Meteor.users.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe("websites");
    Meteor.subscribe("users");
}


// set up security on Images collection
Websites.allow({
    update (userId, doc) {
        return !!Meteor.user();
    },

    insert (userId, doc) {
        if (Meteor.user()) {// they are logged in
            return userId == doc.createdBy;
        }
        else {// user not logged in
            return false;
        }
    },

    remove(userId, doc) {
        return true;
    }
});

Meteor.users.allow({
    update(userId, doc) {
        if (Meteor.user()) {
            return Meteor.user()._id == userId;
        } else {
            return false;
        }
    }
});



