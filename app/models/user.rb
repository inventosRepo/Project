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
    code = ['a'..'z','A'..'Z','0'..'9'].map{ |range| range.to_a }.flatten
    user.code = (0...6).map{ code[ rand(code.size) ] }.join
    user.creatingtime = Time.now
    user.save
  end
end
