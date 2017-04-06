#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    int tab[] =  {12, 13, 14, 15}; // array
    printf("tab[2] = %i \n", tab[2]); // print 3rd element of the array
    printf("tab = %p \n", tab); // print pointer to array

    //================================================================================

    printf("\n\n");
    printf("Element  Address \t Value \t Pointer \n");
    for(int i = 0; i < 4; ++i)
    {
        printf("tab[%i] \t %p \t %i \t %i \n", i, &tab[i], tab[i], *(tab + i));
    }
    printf("\n\n");

    //================================================================================

    char word[] = "my awesome word";
    printf("word = %s \n", word); // print full string

    //word = "my awesome word 2"; // string cannot be changed
    //printf("word = %s", word); // print full string

    char* word2 = "my awesome word 2";
    printf("word2 = %s \n", word2); // print full string

    word2 = "my awesome word 2 was changed"; // char pointer can be used as string and can be changed
    printf("word2 = %s \n", word2); // print full string

    return 0;
}
