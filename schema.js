module.exports = {
    type: 'Object',
    properties: {
        testOrg: {
            type: 'Object',
            properties: {
                name: {
                    type: 'String',
                    values: 'testOrg'
                },
                basic: {
                    type: 'Object',
                    properties: {
                        website: {
                            type: 'String',
                            values: 'http://www.example.com'
                        },
                        industry: {
                            type: 'String',
                            values: 'Retail|IT'
                        },
                        type: {
                            type: 'String',
                            values: 'Startup'
                        },
                        data: {
                            type: 'Object',
                            properties: {
                                name: {
                                    type: 'String',
                                    values: 'Name1'
                                }
                            }
                        }
                    }

                },
                email: {
                    type: 'String',
                    values: 'employee{{}}@mailinator.com',
                    pattern: {
                        type: 'Number',
                        range: '.'//can also be 
                    }
                },
                depatments: {
                    type: 'Array',
                    values: ['HR', 'IT', 'Marketing']
                }
            }
        }
    },
    fileNamePrefix: 'UserPrefix',
}