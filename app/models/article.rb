class Article < ActiveRecord::Base
   has_many :comments, dependent: :destroy
   def to_param
    "#{art_url}"
   end 
   validates :title, presence: true, length: { minimum: 5,maximum: 127}
   validates :art_url, presence: true, length: { minimum: 3, maximum: 31}
end
