Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'}
    }
});

Router.route('/', function () {
    this.render('nav', {
        to: "nav"
    });
    this.render('home');
});

Router.route('/details/:_id', function () {
    this.render('nav', {
        to: "nav"
    });
    this.render('details', {
        data() {
            return Websites.findOne({_id: this.params._id});
        }
    });
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
