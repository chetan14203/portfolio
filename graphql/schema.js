const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!,
        name: String!,
        password: String!,
        email: String!
    }

    input UserInputData {
        email: String!,
        password: String!,
        name: String!
    }

    type AuthUser {
        token: String!,
        userId: String!
    }

    type Project {
        _id: ID!,
        image: String!,
        title: String!,
        description: String!,
        link: String!,
        technologies: [Technology]!
    }

    input ProjectInputData {
        image: String!,
        title: String!,
        description: String!,
        link: String!,
        technologies: [TechnologyInput]!
    }

    type Technology {
        name: String!,
        image: String!
    }

    input TechnologyInput {
        name: String!,
        image: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthUser!,
        project(_id: String!): Project
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!,
        createProject(projectInput: ProjectInputData): Project!,
        projectUpdate(_id:ID!,projectInput:ProjectInputData!):Project!,
        deletedProject(_id:ID!) :Project!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);
