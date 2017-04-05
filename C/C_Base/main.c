/**
        This tutorial shows how to create a new structure
        and define a new method for dynamic memory allocation.

        Krzysztof Dobrzyñski 2017
*/

#include <stdio.h>
#include <stdlib.h>

// Define a new structure
typedef struct Player
{
    int posX, posY;
} Player;

// Create a new method for dynamic memory allocating and set all fields to nulls.
Player *getNewPlayer()
{
    Player *newPlayer = malloc(sizeof(Player));

    newPlayer->posX = 0;
    newPlayer->posY = 0;

    return newPlayer;
}

int main(int argc, char *argv[])
{
    Player *newPlayer = getNewPlayer();

    printf("PosX = %i, PosY = %i \n", newPlayer->posX, newPlayer->posY);

    newPlayer->posX = 3;
    newPlayer->posY = 4;

    printf("After set: PosX = %i, PosY = %i", newPlayer->posX, newPlayer->posY);

    return 0;
}
