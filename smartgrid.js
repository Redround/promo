var smartgrid = require('smart-grid');

smartgrid('./assets/template/app/sass', {
    columns: 12,
    offset: "30px",
    container: {
        maxWidth: "1170px",
        fields: "15px"
    },
    breakPoints: {
        lgl: {
            width: "1280px",
            fields: "15px"
        },
        lg: {
            width: "1140px",
            fields: "15px"
        },
        mdl: {
            width: "1024px",
            fields: "15px"
        },
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "768px",
            fields: "15px"
        },
        xs: {
            width: "425px",
            fields: "15px"
        },
        xxs: {
            width: "320px",
            fields: "15px"
        }
    },
	filename: "_smart-grid",
    outputStyle: "sass",
    mixinNames: {
    },
    properties: [
        "justify-content",
        "align-items",
        "align-content",
        "align-self",
        "order",
        "flex",
        "flex-grow",
        "flex-shrink",
        "flex-basis",
        "flex-direction",
        "flex-wrap",
        "flex-flow",
        "float"
    ]
});