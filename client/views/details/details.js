Template.details.rendered = function () {
    $('.tooltipped').tooltip({delay: 50});
};

Template.details.helpers({
    getDate(date) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleString("en-US", options);
    }
});

Template.details.events({
    'click .js-rate-remove': function (event) {
        if (Meteor.user()) {
            if (!Meteor.user().votes || !~Meteor.user().votes.indexOf(this._id)) {
                Websites.update({_id: this._id}, {$inc: {vote_down: 1, rating:-1}});
                Meteor.users.update({_id: Meteor.userId()}, {$push: {votes: this._id}});
            }
        } else {
            $('#signup').openModal();
        }
    },
    'click .js-rate-add': function (event) {
        if (Meteor.user()) {
            if (!Meteor.user().votes || !~Meteor.user().votes.indexOf(this._id)) {
                Websites.update({_id: this._id}, {$inc: {vote_up: 1, rating: 1}});
                Meteor.users.update({_id: Meteor.userId()}, {$push: {votes: this._id}});
            }
        } else {
            $('#signup').openModal();
        }
    }
});
