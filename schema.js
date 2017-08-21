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
                            values: 'Retail'
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
                depatments: {
                    type: 'Array',
                    values: ['HR', 'IT', 'Marketing']
                }
            }
        }
    }
}