const siteMetadata = {
    title: `Cerberus Development`,
    siteUrl: `https://cerberus.dev`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.jpg`,
    ogImage: `/images/wall.jpg`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `Radically Creative Ideas applied to National Security`,
    description: `Cerberus Development sits at the nexus of IC experience and alternative thinking.`,
    about:
        "Cerberus Development applies alternative approaches to challenging national security problems. We understand the constraints of your environment, speak your language, and will set your mission up for success. We have experience across numerous domains including R&D, SOF, IC, and crisis response.",
    author: `@_akzhy`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT",
            url: "/about",
        },/*
        {
            name: "BLOG",
            url: "/blog",
        },
        {
            name: "PORTFOLIO",
            url: "/portfolio",
        },*/
        {
            name: "CONTACT",
            url: "/contact",
        },
    ],
    footerLinks: [
        
        {
            name: "",
            url: "",
        },
    ], 
    
    social: [/*
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#",
        },*/
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "https://twitter.com/cerbdev",
        },/*
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#",
        },*/
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "",
        description: `Tell us how we can help your mission.`,
        mail: "help@cerberus.dev",
        phone: "‪+1 (347) 637-8137‬",
        address: "Tampa, FL",
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
