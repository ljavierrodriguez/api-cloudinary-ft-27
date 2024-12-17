"""empty message

Revision ID: 4bc9048172ff
Revises: 
Create Date: 2024-12-17 12:34:11.281863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4bc9048172ff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gallery',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('public_id', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('gallery')
    # ### end Alembic commands ###