from fastapi import FastAPI
from . import models, database, auth, routes

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.include_router(auth.router)
app.include_router(routes.router)
