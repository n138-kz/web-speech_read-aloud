drop table transcription
create table transcription (
   uuid          text  not null unique,
   iat           float not null unique,
   sharecode     text  not null,
   authncode     text  not null,
   clientip      text  not null,
   transcription text  not null,
   primary key ( uuid )
)
