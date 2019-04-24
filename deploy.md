# Backend


## Data container

A place to store persistent data

```bash
docker volume create datacontainer
```

### Listing volume data

To see how things are goint within the datacontainer

```bash
docker run -it --volumes-from datacontainer ubuntu /bin/bash
```

## Build And Run

   `Target` param came from dockerfile

```bash
docker build -t italosouza/rsspipeline-app .
docker push italosouza/rsspipeline-app
docker run --name rsspipeline-app --mount source=datacontainer,target=/usr/src/app/tmp -tid -p 8080:8000 italosouza/rsspipeline-app
docker container update --memory 256mb --memory-swap 256mb rsspipeline-app
```

## Deploy

```bash
docker stop rsspipeline-app && docker rm rsspipeline-app && docker pull italosouza/rsspipeline-app && docker run --name rsspipeline-app --mount source=datacontainer,target=/usr/src/app/tmp -tid -p 8080:8000 italosouza/rsspipeline-app
```

# Frontend

```bash
docker build -t italosouza/vmqueue-app .
docker push italosouza/vmqueue-app
docker run --name vmqueue-app -tid -p 80:80 italosouza/vmqueue-app
docker container update --memory 256mb --memory-swap 256mb vmqueue-app
```

## Deploy

```bash
docker stop vmqueue-app && docker rm vmqueue-app  && docker pull italosouza/vmqueue-app && docker run --name vmqueue-app -tid -p 80:80 italosouza/vmqueue-app
```
