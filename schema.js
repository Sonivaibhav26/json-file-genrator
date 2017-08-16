module.exports = {
    type: 'Object',
    properties: {
        testOrg: {
            type: 'Object',
            properties: {
                name: {
                    type: 'String',
                    values: 'testOrg|testOrg2'
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
                            values: 'Startup|SME'
                        },
                        data: {
                            type: 'Object',
                            properties: {
                                name: {
                                    type: 'String',
                                    values: 'Name1|Name'
                                }
                            }
                        }
                    }

                }
            }
        }
    }
}