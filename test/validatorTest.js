const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const validator = require('../src/validator');

describe('validator', () => {

    describe('validateJsonObject', () => {

        beforeEach(() => {
            validator.resetValidator();
        });

        it('a valid (1.json) template should return an object with validTemplate = true, no crit errors', () => {
            const input = require('./data/valid/json/1.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['crit']).to.have.lengthOf(0);
        });

        it('a valid (2.json) template should return an object with validTemplate = true, no crit errors', () => {
            const input = require('./data/valid/json/2.json');
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['crit']).to.have.lengthOf(0);
        });

        it('a valid (3.json) template should return an object with validTemplate = true, no crit errors', () => {
            const input = require('./data/valid/json/3.json');
            let result = validator.validateJsonObject(input);
            console.log(result['errors']['crit']);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['crit']).to.have.lengthOf(0);
        });

        it('a valid (4.json) template should return an object with validTemplate = true, no crit errors', () => {
            const input = require('./data/valid/json/4.json');
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['crit']).to.have.lengthOf(0);
        });

        it('2 invalid resource types should return an object with validTemplate = false, 2 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_resource_type.json');
            let result = validator.validateJsonObject(input);
            console.log(result['errors']['crit']);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(2);
        });

        it('1 missing parameter type should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_missing_parameter_type.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid parameter type should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_parameter_type.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('missing section resources should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/no_resources.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('empty section resources should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/empty_resources.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid resource reference should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_resource_reference.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid parameter reference should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_parameter_reference.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('2 invalid Fn::Join\'s should return an object with validTemplate = false, 2 crit errors', () => {
            const input = require('./data/invalid/json/2_invalid_intrinsic_join.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(2);
        });

        it('1 invalid Fn::GetAtt should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_intrinsic_get_att.json');
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid Fn::FindInMap should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_intrinsic_mappings.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid Ref within Parameters should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_intrinsic_function_in_parameters.json');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 invalid GetAZs parameter should return an object with validTemplate = false, 1 crit errors', () => {
            const input = require('./data/invalid/json/1_invalid_get_azs_parameter.json');
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
        });

        it('1 reference non AWS::Region GetAZs parameter should return an object with validTemplate = false, 1 warn errors', () => {
            const input = require('./data/invalid/json/1_warning_ref_get_azs_parameter.json');
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateJsonObject(input);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['warn']).to.have.lengthOf(1);
        });

        it('1 invalid arn property should return an object with validTemplate = false, 1 crit errors', () => {
            const input = './test/data/invalid/yaml/invalid_arn.yaml';
            let result = validator.validateFile(input);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
            expect(result['errors']['crit'][0]['message']).to.contain('is expecting an Arn');
        });

        it('1 invalid property name should return an object with validTemplate = false, 1 crit errors', () => {
            const input = './test/data/invalid/yaml/invalid_property_name.yaml';
            let result = validator.validateFile(input);
            console.log(result['errors']['crit']);
            expect(result).to.have.deep.property('templateValid', false);
            expect(result['errors']['crit']).to.have.lengthOf(1);
            expect(result['errors']['crit'][0]['message']).to.contain('is not a valid property of');
        });


    });


    describe('validateYamlFile', ()=> {
        beforeEach(() => {
            validator.resetValidator();
        });

        it('a valid (1.json) template should return an object with validTemplate = true, no crit errors', () => {
            const input = 'test/data/valid/yaml/1.yaml';
            validator.addParameterValue('InstanceType', 't1.micro');
            let result = validator.validateFile(input);
            expect(result).to.have.deep.property('templateValid', true);
            expect(result['errors']['crit']).to.have.lengthOf(0);
        });
    });
});