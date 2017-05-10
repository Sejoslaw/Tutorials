#include <stdio.h>
#include <stdlib.h>

int main()
{
    int value = 0;
    while(value != -1)
    {
        printf("Base bet value: ");
        scanf("%i", &value);
        printf("");

        printf("X: ");
        float x;
        scanf("%f", &x);
        printf("");

        printf("");
        int sum = 0;
        printf("Round \t\t Value \t\t Outcome \t\t Sum \n");
        for(int i = 0; i < 10; ++i)
        {
            sum += value;
            printf("%i \t = \t %i \t = \t %f \t = \t %i \n", i + 1, value, x * value, sum);
            value *= 2;
        }
    }

    scanf("%i", &value);
    system("EXIT");
    return 0;
}
