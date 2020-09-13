# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Unit.destroy_all()
Ingredient.destroy_all()
Meal.destroy_all()

lb = Unit.create(name: 'lb')
cup = Unit.create(name: 'cup')
teaspoon = Unit.create(name: 'teaspoon')
na = Unit.create(name: '')

evoo = Ingredient.create(name: 'extra-virgin olive oil')
ss = Ingredient.create(name: 'sea salt')
ley = Ingredient.create(name: 'large egg yolks')

breakfast = Meal.create(name: 'breakfast')
lunch = Meal.create(name: 'lunch')
dinner = Meal.create(name: 'dinner')