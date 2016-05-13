class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, authentication_keys: [:email]
  def self.remove_code(user)
    user.code = nil
    user.save
  end

  def self.generate_code(user)
    a = ('a'..'z').to_a
    user.code = a[1..6].shuffle.join
    user.creatingtime = Time.now
    user.save
  end
end
