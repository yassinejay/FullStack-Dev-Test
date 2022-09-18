Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :installations, only: %i[index show create]
    end
  end
end

