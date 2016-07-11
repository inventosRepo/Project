class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:vkontakte, :mailru, :facebook, :twitter], authentication_keys: [:email]

  def remove_code
    self.code = nil
    self.qrcode = nil
    save
  end

  def generate_code
    code = ['a'..'z', 'A'..'Z', '0'..'9'].map(&:to_a).flatten
    self.code = (0...6).map { code[rand(code.size)] }.join
    self.qrcode = RQRCode::QRCode.new(APP_CONFIG[:ip_for_link_qr] + '/code/hi?code=' + self.code, size: 5, level: :h).as_html
    self.creatingtime = Time.now
    save
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.name
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
