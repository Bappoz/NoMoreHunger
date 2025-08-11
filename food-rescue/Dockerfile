FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw -v || true
# Build via maven instalado no sistema; para simplicidade usamos mvn, assumindo que a imagem não tem mvn.
# Melhor alternativa: usar imagem maven como build stage
FROM maven:3.9.4-eclipse-temurin-17 AS maven-build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=maven-build /app/target/food-rescue-0.1.0.jar ./food-rescue.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/food-rescue.jar"]
