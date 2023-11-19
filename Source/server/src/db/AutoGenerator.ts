const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('ptudwnc', 'postgres', '123456?a', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    directory: './src/models',
    caseModel: 'p',
    caseFile: 'p',
    caseProp: 'c',
    singularize: true,
    useDefine: true,
    indentation: 4,
    lang: 'ts',
    views: true,
});

auto.run();