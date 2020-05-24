const { buildSchema } = require('graphql')
const Joi = require('@hapi/joi');

var coursesData = [
    {
        id: 1,
        title: ' titele 11',
        desc: 'desc 11'
    },
    {
        id: 2,
        title: 'tttll 2',
        desc: 'desc 22'
    },
    {
        id: 3,
        title: 'tsdfysd 3',
        desc: 'desss 3'
    }
]

var testM = [
    {
        id: 1,
        name: 'Puneet',
        social: {
            Facebook: 'fb.com',
            Google: 'g.com',
            Line: 'L.com'
        }
    },
    {
        id: 2,
        name: 'Raja',
        social: {
            Facebook: 'fbq.com',
            Google: 'gq.com',
            Line: 'Lq.com'
        }
    }
];

//schema 
const schema = buildSchema(`

    type Courses {
        id:Int
        title:String
        desc:String
    }

    type TestM {
        id:ID
        name:String
        social: Social
    }

    type Social {
        Facebook:String
        Google:String
        Line:String
    }

    input SocialI {
        Facebook:String
        Google:String
        Line:String
    }

    input testMInput{
        id: ID
        name: String
        social: SocialI
    }

    type Mutation {
        updateCourse(id:Int, title:String, desc:String): [Courses]
        addTestM(args:testMInput) : [TestM]
    }



    type Query{
        message:String
        courses:[Courses]
        courses2:[Courses]
        coursesSingle(id:Int):Courses
        getTestM:[TestM]
    }
`);

var getCourses = () => {
    return coursesData.map(item => item);
}

const getTestM = () => {
    return testM;
}

const getSingleCourses = (args) => {
    const { id } = args;
    return coursesData.filter(item => item.id === id)[0];
}

const updateCourseData = (args) => {
    coursesData.push({
        id: args.id,
        title: args.title,
        desc: args.desc
    })

    return coursesData;
}

const joiSchema = Joi.object({
    args: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        social: Joi.object({
            Facebook: Joi.string().required(),
            Google: Joi.string().required(),
            Line: Joi.string().required(),
        })
    })
})

const validateAddTestM = (args) => {
    const validate = joiSchema.validate(args);
    console.log("validateAddTestM -> validate", validate)
    if (validate.error) throw new Error(validate.error.message);
    return validate.value;
}

const addTestM = (args) => {
    const validateAddTest = validateAddTestM(args);
    console.log("addTestM -> validateAddTest", validateAddTest)
    return testM;
}

//root resolver
const resolver = {
    message: () => 'Hello World!',
    courses: () => coursesData.map(item => item),
    courses2: getCourses,
    coursesSingle: getSingleCourses,
    updateCourse: updateCourseData,
    getTestM,
    addTestM
}

module.exports = { schema, resolver }
