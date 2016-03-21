Meteor.startup(function () {
    if (!Websites.find().count()) {
        Websites.insert({
            title: 'Google',
            description: "Search the world's information, including webpages, images, videos and more. " +
            "Google has many special features to help you find exactly what you're looking for.",
            img: 'https://i.ytimg.com/vi/PAKCgvprpQ8/maxresdefault.jpg',
            link: 'https://www.google.com/',
            createdOn: new Date()
        });

        Websites.insert({
            title: 'Materialize',
            description: "A modern responsive front-end framework based on Material Design",
            img: 'http://materializecss.com/images/responsive.png',
            link: 'http://materializecss.com/',
            createdOn: new Date()
        });

        Websites.insert({
            title: 'Atmosphere',
            description: "Atmosphere is the catalog for Meteor packages, resources and tools. Explore the most popular, " +
            "trusted, and reliable packages to install in your apps.",
            img: 'https://atmospherejs.com/bg-hero-1200x600.jpg',
            link: 'https://atmospherejs.com/',
            createdOn: new Date()
        });

        Websites.insert({
            title: 'Meteor',
            description: "Meteor is a full-stack JavaScript App Platform that assembles all the pieces you need to " +
            "build modern web and mobile apps, with a single JavaScript codebase. Angular and React are JavaScript UI " +
            "frameworks that can be used in conjunction with Meteor, as an alternative to Meteor’s Blaze library. Think " +
            "of Angular, React, and Blaze as the 'V' in MVC. Meteor automatically manages the data flow between cloud " +
            "and client applications, as well as client UI state and rendering, regardless of which UI framework you use.",
            img: 'http://image.slidesharecdn.com/meteor-141212075307-conversion-gate02/95/meteor-presentation-1-638.jpg?cb=1418371010',
            link: 'https://www.meteor.com/',
            createdOn: new Date()
        })
    }
});
