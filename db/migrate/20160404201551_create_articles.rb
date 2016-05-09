class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :creator
      t.string :title
      t.text :text
      t.string :art_url
      t.index :art_url
      t.timestamps null: false
    end
  end
end
