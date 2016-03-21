Template.home.rendered = function () {
    $('.modal-trigger').leanModal();
};

Template.home.helpers({
    list() {
        return Websites.find({title: {$regex: Session.get('search') || '', $options: 'i'}}, {
            sort: {
                rating: -1,
                createdOn: -1
            }/*, limit: Session.get("imageLimit")*/
        });
    },
    getDate(date) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleString("en-US", options);
    }
});

Template.home.events({
    'click .js-rate-remove': function (event) {
        if (Meteor.user()) {
            if (!Meteor.user().votes || !~Meteor.user().votes.indexOf(this._id)) {
                Websites.update({_id: this._id}, {$inc: {vote_down: 1, rating: -1}});
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
    },
    'click .js-add-site-modal': function (event) {
        $('#add-site').openModal();
    },
    'keyup #search': function (event) {
        Session.set('search', event.target.value);
    }
});


Template.addSite.helpers({
    previewTitle() {
        return Session.get("previewTitle");
    },
    previewImgUrl() {
        return Session.get("previewImgUrl");
    },
    previewDescription() {
        return Session.get("previewDescription");
    }
});

Template.addSite.events({
    'change #link': function (event) {
        var url = event.target.value;
        if (!url) {
            return false;
        }
        if (url.indexOf('http') !== 0) {
            url = event.target.value = 'http://' + event.target.value;
        }
        Meteor.call('checkUrl', event.target.value, function (error, result) {
            if (error) {
                console.log(error);
                return;
            }

            var $content = $(result.content);
            var previewTitle = $content.filter('title').html()
                || $content.filter('meta[property="og:title"]').attr('content')
                || $content.filter('meta[property="twitter:title"]').attr('content');
            $('#name').val(previewTitle);
            Session.set("previewTitle", previewTitle);

            var previewDescription = $content.filter('meta[name=description]').attr('content')
                || $content.filter('meta[property="og:description"]').attr('content');
            $('#description').val(previewDescription);
            Session.set("previewDescription", previewDescription);

            var previewImgUrl = $content.filter('meta[itemprop=image]').attr('content')
                || $content.filter('meta[property="og:image"]').attr('content')
                || $content.filter('meta[property="twitter:image"]').attr('content');
            if (previewImgUrl && previewImgUrl.indexOf('http') !== 0 && previewImgUrl.indexOf('//') !== 0) {
                previewImgUrl = $('#link').val() + previewImgUrl;
            }
            $('#img_url').val(previewImgUrl);
            Session.set("previewImgUrl", previewImgUrl);
        });
    },
    'change #name': function (event) {
        Session.set("previewTitle", event.target.value);
    },
    'change #img_url': function (event) {
        Session.set("previewImgUrl", event.target.value);
    },
    'change #description': function (event) {
        Session.set("previewDescription", event.target.value);
    },
    'submit .js-add-site': function (event) {
        event.preventDefault();

        if (Meteor.user()) {
            Websites.insert({
                title: event.target.name.value,
                description: event.target.description.value,
                img: event.target.img_url.value,
                link: event.target.link.value,
                createdOn: new Date(),
                createdBy: Meteor.user()._id
            });
        }
        $('#add-site').closeModal();
        event.target.reset();
        Session.set("previewDescription", '');
        Session.set("previewImgUrl", '');
        Session.set("previewTitle", '');
        return false;
    }
});
