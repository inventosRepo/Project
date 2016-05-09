class ArticlesController < ApplicationController

   before_filter :authenticate_user!, :except => [:show, :index]

   def index
     @articles = Article.all
   end

   def new
     @article = Article.new
   end

   def edit
     @article = Article.find_by(art_url: params[:art_url])
   end

   def create
     @article = Article.new(article_params)

     if @article.save
        redirect_to @article
     else
        render 'new'
     end
   end

   def update
     @article = Article.find_by(params[:art_url])

     if @article.update(article_params)
        redirect_to @article
     else
        render 'edit'
     end
   end

   def destroy
     @article = Article.find_by(params[:art_url])
     @article.destroy

     redirect_to articles_path
   end

   def show
     @article = Article.find_by(art_url: params[:art_url])
   end

   private
   def article_params
     params.require(:article).permit(:creator, :title, :text, :art_url)
   end
end
