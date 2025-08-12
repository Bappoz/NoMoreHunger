-- Script de inicialização do banco de dados
-- Este script será executado quando o container PostgreSQL for criado

-- Criar schema principal
CREATE SCHEMA IF NOT EXISTS public;

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para funcionalidades geográficas futuras (desabilitado - requer postgis image)

-- Configurações de timezone
SET timezone = 'America/Sao_Paulo';

-- Criar tabelas iniciais (Spring Boot irá gerenciar via Hibernate)
-- Este arquivo serve principalmente para configurações iniciais e dados de exemplo

-- Inserir dados de exemplo após as tabelas serem criadas pelo Hibernate
-- (Os dados serão inseridos via data.sql do Spring Boot)
