# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(single_game.js)
Rails.application.config.assets.precompile += %w(single_player_logic.js)
Rails.application.config.assets.precompile += %w(single_bullet_logic.js)
Rails.application.config.assets.precompile += %w(npc_logic.js)
Rails.application.config.assets.precompile += %w(npc_bullet_logic.js)
Rails.application.config.assets.precompile += %w(multi_game.js.erb)
Rails.application.config.assets.precompile += %w(multi_player_logic.js)
Rails.application.config.assets.precompile += %w(multi_bullet_logic.js)
