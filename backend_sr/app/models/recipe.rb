class Recipe < ApplicationRecord
  belongs_to :meal
  has_many :ingredients
  has_many :unit, through: :ingredients
end
