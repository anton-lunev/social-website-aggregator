if (Meteor.server) {

    Meteor.methods({
        checkUrl(url) {
            return Meteor.http.get(url, {
                encoding: 'UTF-8',
                headers: {
                    'Content-Type': 'text/html; charset=UTF-8'
                }
            });
        }
    });
}
