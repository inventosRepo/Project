class AddQrcodeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :qrcode, :text
  end
end
