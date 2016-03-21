Template.vote.rendered = function () {
    $('.tooltipped').tooltip({delay: 50});
};

Template.vote.helpers({
    getValue(val) {
        return val === undefined ? 0 : val
    },
    checkVote(id) {
        if (Meteor.user() && Meteor.user().votes) {
            return ~Meteor.user().votes.indexOf(id) ? 'disabled' : '';
        }
    }
});

