require 'test_helper'
require 'faker'

class InstallationsControllerTest < ActionDispatch::IntegrationTest
  # ========== Clear Test DataBase
  Installation.destroy_all
  Company.destroy_all
  Customer.destroy_all

  # ========== Data
  company = {
    name: Faker::Company.name,
    siren: Faker::Company.french_siren_number

  }

  company1 = {
    name: Faker::Company.name,
    siren: 333

  }
  customer = {
    name: Faker::Name.name,
    email: Faker::Internet.email,
    phone_number: Faker::PhoneNumber.cell_phone_in_e164
  }

  installation = {
    address: Faker::Address.full_address,
    installed_at: Faker::Date.in_date_period.to_datetime,
    panels_number: Faker::Number.number(digits: 3),
    kind: :hybrid,
    panels_identification: Faker::Number.number(digits: 6),
    company: company,
    customer: customer
  }

  installation1 = {
    address: Faker::Address.full_address,
    installed_at: Faker::Date.in_date_period.to_datetime,
    panels_number: Faker::Number.number(digits: 3),
    kind: :hybrid,
    panels_identification: Faker::Number.number(digits: 6)
  }
  installation2 = {
    address: Faker::Address.full_address,
    installed_at: Faker::Date.in_date_period.to_datetime,
    panels_number: Faker::Number.number(digits: 3),
    kind: :hybrid,
    panels_identification: Faker::Number.number(digits: 6),
    company: company1,
    customer: customer
  }

  # ========== Create Installation
  test 'should create installation' do
    assert_difference 'Installation.count', 1 do
      post api_v1_installations_url, params: { installation: installation }, as: :json
    end
    
    assert_response 201
  end

  test 'should not create installation without company or customer' do
    assert_difference 'Installation.count', 0 do
      post api_v1_installations_url, params: { installation: installation1 }, as: :json
    end

    assert_response 422
  end

  test 'should not create installation without the correct panels_identification' do
    assert_difference 'Installation.count', 0 do
      post api_v1_installations_url, params: { installation: installation2 }, as: :json
    end

    assert_response 422
  end

  # ========== Show Installation
  test 'should show installation' do
    Company.create(company)
    Customer.create(customer)
    Installation.create({
                          address: Faker::Address.full_address,
                          installed_at: Faker::Date.in_date_period.to_datetime,
                          panels_number: Faker::Number.number(digits: 3),
                          kind: :hybrid,
                          panels_identification: Faker::Number.number(digits: 6),
                          company_id: Company.first.id,
                          customer_id: Customer.first.id
                        })
    get api_v1_installation_url(Installation.first), as: :json
    json_response = JSON.parse(response.body)
    assert_equal 'hybrid', json_response['kind']
  end

  # ============= Index Installation
  test 'should get Installation index' do
    Company.create(company)
    Customer.create(customer)
    Installation.create({
                          address: Faker::Address.full_address,
                          installed_at: Faker::Date.in_date_period.to_datetime,
                          panels_number: Faker::Number.number(digits: 3),
                          kind: :hybrid,
                          panels_identification: Faker::Number.number(digits: 6),
                          company_id: Company.first.id,
                          customer_id: Customer.first.id
                        })
    get api_v1_installations_url, as: :json
    assert_response :success
  end
end
